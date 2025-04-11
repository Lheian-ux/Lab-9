import React, { useEffect, useRef } from 'react';
import './MatrixBackground.css';

const MatrixBackground = () => {
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
    
    // Matrix characters
    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100); // Start above the canvas
    }
    
    // Drawing the characters
    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0'; // Green text
      ctx.font = `${fontSize}px monospace`;
      
      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        drops[i]++;
        
        // Send the drop back to the top randomly after it crosses the screen
        // Add randomness to the reset to make the drops scattered
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Randomly change the color of some characters for a glowing effect
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#fff'; // White for highlight
        } else {
          ctx.fillStyle = '#0f0'; // Back to green
        }
      }
    };
    
    // Animation loop
    const interval = setInterval(draw, 50);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-background" />;
};

export default MatrixBackground;
