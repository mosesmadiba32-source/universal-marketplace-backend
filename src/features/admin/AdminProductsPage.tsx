import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogApi } from '../catalog/catalogApi';
import { adminApi } from './adminApi';
import { useCategories } from '../catalog/useCatalog';
import { Product } from '../../shared/types/api';
import { formatPrice, getImageUrl } from '../../shared/lib/utils';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { Badge } from '../../shared/components/Badge';
import { Modal } from '../../shared/components/Modal';
import { useUiStore } from '../../shared/store/uiStore';
import { Plus, Trash2, Edit2, UploadCloud, Package, Search } from 'lucide-react';

import { INITIAL_PRODUCTS } from '../../shared/lib/mockData';

const ARTISAN_CATEGORIES = [
  { id: 'ceramics', name: 'Ceramics & Stoneware Pottery' },
  { id: 'woodwork', name: 'Hand-carved Woodwork & Furniture' },
  { id: 'textiles', name: 'Organic Textiles & Tapestry' },
  { id: 'jewelry', name: 'Fine Artisan Jewelry & Metalsmithing' },
  { id: 'paintings', name: 'Original Paintings & Fine Art' },
  { id: 'sculpture', name: 'Glass, Bronze & Stone Sculptures' },
  { id: 'electronics', name: 'Audio Craft & Custom Electronics' },
  { id: 'home-living', name: 'Organic Home, Candles & Living' },
  { id: 'fashion', name: 'Artisanal Wear & Leathercraft' },
];

export const AdminProductsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [localProducts, setLocalProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['admin-products', page, search],
    queryFn: () => catalogApi.getProducts({ page, limit: 20, search: search || undefined }),
  });

  const { data: categoriesData } = useCategories({ limit: 100 });
  const allCategories = categoriesData?.categories && categoriesData.categories.length > 0
    ? categoriesData.categories
    : ARTISAN_CATEGORIES;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    sku: '',
    brand: '',
    basePrice: '',
    salePrice: '',
    stockQuantity: 10,
    categoryId: 'ceramics',
    imageUrl: '',
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      sku: `ART-${Math.floor(100 + Math.random() * 900)}`,
      brand: 'Master Artisan Guild',
      basePrice: '',
      salePrice: '',
      stockQuantity: 15,
      categoryId: allCategories[0]?.id || 'ceramics',
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      sku: p.sku,
      brand: p.brand || '',
      basePrice: String(p.basePrice),
      salePrice: p.salePrice ? String(p.salePrice) : '',
      stockQuantity: p.stockQuantity,
      categoryId: p.categoryId,
      imageUrl: p.images?.[0]?.url || '',
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await adminApi.uploadImage(file, 'products');
      setForm((prev) => ({ ...prev, imageUrl: res.path }));
      addToast({
        type: 'success',
        title: 'Image Uploaded',
        message: 'Product image processed and optimized.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Upload Failed',
        message: 'Image size must be under 5MB (JPEG, PNG, WebP).',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const saveProductMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      if (editingProduct) {
        return adminApi.updateProduct(editingProduct.id, payload);
      }
      return adminApi.createProduct(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      addToast({
        type: 'success',
        title: editingProduct ? 'Product Updated' : 'Product Created',
      });
      setIsModalOpen(false);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: error.response?.data?.message || 'Check SKU and Slug uniqueness.',
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      addToast({
        type: 'info',
        title: 'Product Archived / Deleted',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.sku || !form.basePrice || !form.categoryId) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload: Record<string, unknown> = {
      name: form.name,
      slug: form.slug.toLowerCase().replace(/\s+/g, '-'),
      description: form.description || undefined,
      sku: form.sku.toUpperCase(),
      brand: form.brand || undefined,
      basePrice: parseFloat(form.basePrice),
      salePrice: form.salePrice ? parseFloat(form.salePrice) : undefined,
      stockQuantity: Number(form.stockQuantity),
      categoryId: form.categoryId,
    };

    const imageUrl = form.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
    payload.images = [{ url: imageUrl, sortOrder: 0 }];

    const newOrUpdatedProduct: Product = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      name: form.name,
      slug: form.slug.toLowerCase().replace(/\s+/g, '-'),
      description: form.description || '',
      sku: form.sku.toUpperCase(),
      brand: form.brand || 'Master Artisan Direct',
      basePrice: parseFloat(form.basePrice),
      salePrice: form.salePrice ? parseFloat(form.salePrice) : undefined,
      stockQuantity: Number(form.stockQuantity),
      categoryId: form.categoryId,
      category: {
        id: form.categoryId,
        name: allCategories.find((c) => c.id === form.categoryId)?.name || 'Artisan Goods',
        slug: form.categoryId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      images: [{ id: `img-${Date.now()}`, url: imageUrl, sortOrder: 0, productId: '' }],
      status: 'ACTIVE',
      averageRating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingProduct) {
      setLocalProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? newOrUpdatedProduct : p)));
    } else {
      setLocalProducts((prev) => [newOrUpdatedProduct, ...prev]);
    }

    saveProductMutation.mutate(payload);
    setIsModalOpen(false);
    addToast({
      type: 'success',
      title: editingProduct ? 'Commodity Updated' : 'Commodity Added to Catalog',
      message: `${form.name} is now active and purchasable in the storefront.`,
    });
  };

  const products = (productsData?.products && productsData.products.length > 0
    ? productsData.products
    : localProducts
  ).filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Product Catalog Management
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Create, update, stock, and manage active catalog items
          </p>
        </div>
        <Button variant="accent" size="sm" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" /> Add Product
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="max-w-xs w-full">
          <Input
            placeholder="Search products by title, SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-card border border-neutral-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-700 uppercase font-bold border-b border-neutral-200">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-neutral-400">
                    Loading catalog items...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-neutral-500">
                    No products found. Click "Add Product" to create your first item.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={getImageUrl(p.images?.[0]?.url)}
                          alt=""
                          className="w-10 h-10 rounded object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/placeholder-product.svg';
                          }}
                        />
                        <span className="font-bold text-neutral-900 line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-neutral-600">{p.sku}</td>
                    <td className="px-4 py-3 text-neutral-700">{p.category?.name || '—'}</td>
                    <td className="px-4 py-3 font-bold text-neutral-900">
                      {formatPrice(p.salePrice ?? p.basePrice)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={p.stockQuantity <= 5 ? 'text-status-danger font-bold' : 'font-semibold'}>
                        {p.stockQuantity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={p.status} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Archive product ${p.name}?`)) {
                              deleteProductMutation.mutate(p.id);
                            }
                          }}
                          className="p-1.5 text-neutral-400 hover:text-status-danger"
                          title="Delete / Archive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Create New Product'}
        description="Provide catalog specifications and upload an optimized product image."
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Product Name *"
              value={form.name}
              onChange={(e) => {
                setForm({
                  ...form,
                  name: e.target.value,
                  slug: editingProduct ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-'),
                });
              }}
              required
            />
            <Input
              label="Slug *"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="SKU *"
              value={form.sku}
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              required
            />
            <Input
              label="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
            <Select
              label="Artisan Category *"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              options={allCategories.map((c) => ({ value: c.id, label: c.name }))}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Base Price ($) *"
              type="number"
              step="0.01"
              value={form.basePrice}
              onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
              required
            />
            <Input
              label="Sale Price ($)"
              type="number"
              step="0.01"
              value={form.salePrice}
              onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
            />
            <Input
              label="Initial Stock *"
              type="number"
              value={form.stockQuantity}
              onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-white border border-neutral-300 rounded-input p-2.5 text-xs focus:outline-none focus:border-primary"
            />
          </div>

          {/* Image Upload Widget */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide block">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {form.imageUrl && (
                <img
                  src={getImageUrl(form.imageUrl)}
                  alt="Preview"
                  className="w-16 h-16 rounded-btn object-cover border border-neutral-200"
                />
              )}
              <label className="inline-flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded-btn text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 cursor-pointer shadow-xs">
                <UploadCloud className="w-4 h-4 text-accent" />
                <span>{uploadingImage ? 'Processing...' : 'Upload Image File'}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              isLoading={saveProductMutation.isPending}
            >
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
