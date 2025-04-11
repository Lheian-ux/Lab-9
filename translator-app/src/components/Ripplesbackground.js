import React, { useEffect, useRef } from 'react';
import './Ripplesbackground.css';

const RipplesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Ripple class
    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = Math.random() * 100 + 100;
        this.speed = Math.random() * 2 + 1;
        this.opacity = 1;
        this.color = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`;
      }
      
      update() {
        this.radius += this.speed;
        this.opacity = 1 - (this.radius / this.maxRadius);
        return this.radius < this.maxRadius;
      }
      
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    
    // Array to store ripples
    let ripples = [];
    
    // Create new ripples randomly
    const createRipple = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ripples.push(new Ripple(x, y));
      
      // Schedule next ripple
      setTimeout(createRipple, Math.random() * 1000 + 500);
    };
    
    // Start creating ripples
    createRipple();
    
    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw ripples
      ripples = ripples.filter(ripple => {
        ripple.draw(ctx);
        return ripple.update();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="ripples-background" />;
};

export default RipplesBackground;
