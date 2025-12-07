import React from 'react';
import { Stats } from './github';

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const drawGitHubIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.save();
  ctx.fillStyle = '#000000';
  
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2.5, 0, Math.PI * 2);
  ctx.fill();
  
  const earSize = size / 6;
  ctx.beginPath();
  ctx.moveTo(x + size / 2 - size / 4, y + size / 4);
  ctx.lineTo(x + size / 2 - size / 6, y);
  ctx.lineTo(x + size / 2 - size / 8, y + size / 4);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + size / 2 + size / 8, y + size / 4);
  ctx.lineTo(x + size / 2 + size / 6, y);
  ctx.lineTo(x + size / 2 + size / 4, y + size / 4);
  ctx.fill();
  
  ctx.strokeStyle = '#F3EFE0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x + size / 2 - size / 8, y + size / 2, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#F3EFE0';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + size / 2 + size / 8, y + size / 2, 2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

export const captureCard = async (cardRef: React.RefObject<HTMLDivElement | null>, stats: Stats): Promise<HTMLCanvasElement | null> => {
  if (!cardRef.current || !stats) return null;
  
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const scale = 2;
    const cardRect = cardRef.current.getBoundingClientRect();
    canvas.width = cardRect.width * scale;
    canvas.height = cardRect.height * scale;
    ctx.scale(scale, scale);

    ctx.fillStyle = '#F3EFE0';
    ctx.fillRect(0, 0, cardRect.width, cardRect.height);

    const [gitImage, avatarImage] = await Promise.all([
      loadImage('/git.png'),
      loadImage(stats.avatarUrl)
    ]);

    const gitImageHeight = (cardRect.width / gitImage.width) * gitImage.height;
    ctx.drawImage(gitImage, 0, 0, cardRect.width, gitImageHeight);

    const avatarElement = cardRef.current.querySelector('img[alt="GitHub profile"]') as HTMLImageElement;
    let avatarSize: number;
    let avatarX: number;
    let avatarY: number;
    
    if (avatarElement) {
      const avatarRect = avatarElement.getBoundingClientRect();
      avatarSize = avatarRect.width;
      avatarX = avatarRect.left - cardRect.left;
      avatarY = avatarRect.top - cardRect.top;
    } else {
      const baseAvatarSize = cardRect.width * 0.75;
      const maxAvatarSize = Math.min(baseAvatarSize, 360);
      avatarSize = maxAvatarSize;
      avatarX = cardRect.width - avatarSize - 16;
      avatarY = 16;
    }
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(avatarX, avatarY, avatarSize, avatarSize);
    
    ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);

    const padding = 16;
    const imageSectionHeight = gitImageHeight + 24;
    const contentStartY = imageSectionHeight;
    const columnWidth = (cardRect.width - padding * 2 - 64) / 2;
    const leftColumnX = padding;
    const rightColumnX = padding + columnWidth + 64;

    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText('Top Languages', leftColumnX, contentStartY + 12);
    
    const languageStartY = contentStartY + 36;
    stats.languages.forEach((lang, index) => {
      const y = languageStartY + (index * 22);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${index + 1}`, leftColumnX, y);
      ctx.fillStyle = '#0f0f0f';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(lang, leftColumnX + 20, y);
    });

    const minutesY = contentStartY + 160;
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.fillText('Minutes Coded', leftColumnX, minutesY);
    ctx.fillStyle = '#0f0f0f';
    ctx.font = 'bold 20px sans-serif';
    const minutesText = `~ ${stats.minutes} min`;
    ctx.fillText(minutesText, leftColumnX, minutesY + 20);

    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.fillText('Top Projects', rightColumnX, contentStartY + 12);
    
    const projectStartY = contentStartY + 36;
    stats.projects.forEach((project, index) => {
      const y = projectStartY + (index * 22);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${index + 1}`, rightColumnX, y);
      ctx.fillStyle = '#0f0f0f';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(project, rightColumnX + 20, y);
    });

    const domainY = contentStartY + 160;
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.fillText('Domain', rightColumnX, domainY);
    ctx.fillStyle = '#0f0f0f';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(stats.domain, rightColumnX, domainY + 20);

    return canvas;
  } catch (error) {
    console.error('Error capturing card:', error);
    return null;
  }
};

export const copyCardToClipboard = async (canvas: HTMLCanvasElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (blob) {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Failed to create blob'));
      }
    });
  });
};

export const downloadCard = (canvas: HTMLCanvasElement, username: string): void => {
  const pngDataUrl = canvas.toDataURL('image/png');
  const canvasDownload = document.createElement('a');
  canvasDownload.href = pngDataUrl;
  canvasDownload.download = `github-stats-${username || 'card'}.png`;
  document.body.appendChild(canvasDownload);
  canvasDownload.click();
  document.body.removeChild(canvasDownload);
};

