import React, { useState, useRef, useEffect } from 'react';
import {
  Rotate3d,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Sparkles,
  Layers,
  Sun,
} from 'lucide-react';
import { Button } from '../../../shared/components/Button';

interface Product3DViewerProps {
  productName: string;
  images: string[];
  category?: string;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  productName,
  images,
  category = 'Ceramics',
}) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lightingMode, setLightingMode] = useState<'studio' | 'gallery' | 'warm'>('studio');
  const [activeWireframe, setActiveWireframe] = useState(false);

  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number>();

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging) return;

    const rotate = () => {
      setRotationY((prev) => (prev + 0.6) % 360);
      animFrameRef.current = requestAnimationFrame(rotate);
    };

    animFrameRef.current = requestAnimationFrame(rotate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoRotating, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    startPosRef.current = { x: e.clientX, y: e.clientY };

    setRotationY((prev) => (prev + deltaX * 0.8) % 360);
    setRotationX((prev) => Math.max(-30, Math.min(30, prev - deltaY * 0.5)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setIsAutoRotating(false);
      startPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startPosRef.current.x;
    const deltaY = e.touches[0].clientY - startPosRef.current.y;
    startPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setRotationY((prev) => (prev + deltaX * 0.8) % 360);
    setRotationX((prev) => Math.max(-30, Math.min(30, prev - deltaY * 0.5)));
  };

  const handleReset = () => {
    setRotationX(0);
    setRotationY(0);
    setZoomLevel(1);
    setIsAutoRotating(true);
  };

  // Determine which image angle to show based on rotationY
  const normalizedAngle = ((rotationY % 360) + 360) % 360;
  const imageIndex = Math.min(
    images.length - 1,
    Math.floor((normalizedAngle / 360) * images.length)
  );

  return (
    <div className="relative w-full aspect-square bg-gradient-to-b from-[#0A1830] via-[#0F2347] to-[#081224] rounded-[16px] overflow-hidden border border-navy-800 shadow-2xl select-none flex flex-col justify-between p-4">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white">
          <Rotate3d className="w-4 h-4 text-gold-400 animate-spin-slow" />
          <span className="text-[11px] font-bold tracking-wider uppercase">
            360° Artisan Studio
          </span>
          <span className="text-[10px] text-gold-400 font-mono font-bold bg-white/10 px-1.5 py-0.5 rounded">
            {Math.round(normalizedAngle)}°
          </span>
        </div>

        {/* Studio Lighting Toggle */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/15">
          <button
            type="button"
            onClick={() => setLightingMode('studio')}
            className={`p-1.5 rounded-full text-xs font-bold transition-all ${
              lightingMode === 'studio'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
            title="Studio Cool Lighting"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('warm')}
            className={`p-1.5 rounded-full text-xs font-bold transition-all ${
              lightingMode === 'warm'
                ? 'bg-gold-500 text-navy-900 shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
            title="Artisan Warm Gallery Light"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 3D Turntable Stage */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="flex-1 flex items-center justify-center relative cursor-grab active:cursor-grabbing perspective-1000 overflow-hidden"
      >
        {/* Dynamic Studio Spotlights */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            lightingMode === 'warm'
              ? 'bg-radial-gradient from-amber-500/15 via-transparent to-transparent'
              : 'bg-radial-gradient from-cyan-500/15 via-transparent to-transparent'
          }`}
        />

        {/* Pedestal Shadow Ring */}
        <div
          className="absolute bottom-6 w-56 h-12 bg-black/60 rounded-full blur-xl transform scale-y-50 pointer-events-none transition-transform duration-150"
          style={{
            transform: `scale(${zoomLevel * 0.9}) scaleY(0.4) rotateX(60deg)`,
          }}
        />

        {/* 3D Rotatable Product Plane */}
        <div
          className="relative transition-transform duration-75 ease-out flex items-center justify-center pointer-events-none"
          style={{
            transform: `scale(${zoomLevel}) rotateX(${rotationX}deg) rotateY(${(rotationY % 360) * 0.1}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Active 360 View Angle Image */}
          <img
            src={images[imageIndex] || images[0]}
            alt={`${productName} 360 view`}
            className={`max-h-64 max-w-64 object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)] transition-all ${
              lightingMode === 'warm' ? 'sepia-[0.15] brightness-105' : 'brightness-100'
            }`}
            draggable={false}
          />

          {/* Optional Wireframe Layer Simulation */}
          {activeWireframe && (
            <div className="absolute inset-0 border border-gold-400/40 rounded-lg pointer-events-none flex items-center justify-center">
              <div className="w-full h-full border border-dashed border-cyan-400/30 rounded-full" />
            </div>
          )}
        </div>

        {/* Interactive Drag Hint */}
        <div className="absolute bottom-2 text-white/50 text-[10px] font-semibold tracking-wide pointer-events-none flex items-center gap-1.5">
          <span>‹ Drag to Rotate 360° ›</span>
        </div>
      </div>

      {/* Bottom Tool Controls */}
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-2 rounded-[12px] border border-white/15 text-white z-10">
        <div className="flex items-center gap-2">
          {/* Play/Pause Rotation */}
          <button
            type="button"
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isAutoRotating ? 'Pause Auto-Spin' : 'Start Auto-Spin'}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono font-bold text-white/80 w-10 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
