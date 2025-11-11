#!/usr/bin/env python3
"""
Genera imágenes placeholder para los productos de la tienda de juegos.
"""
from PIL import Image, ImageDraw, ImageFont
import os
import random

# Crear carpeta si no existe
img_dir = 'public/img'
os.makedirs(img_dir, exist_ok=True)

# Lista de imágenes necesarias
images_needed = [
    'CyberPunk.jpeg',
    'EldenRingShadows.jpeg',
    'HorizonForbiddenWest.jpeg',
    'ResidentEvil4Remake.jpeg',
    'FIFA24.jpeg',
    'TheSims5.jpeg',
    'StardewValleyExpanded.jpeg',
    'Counter-Strike2.jpeg',
    'BaldursGate3.jpeg',
    'CallofDutyModernWarfareIII.jpeg',
    'Minecraft.jpeg',
    'GrandTheftAutoV.jpeg',
    'TheWitcher3WildHunt.jpeg',
    'RedDeadRedemption2.jpeg',
    'GodofWarRagnarök.jpeg',
    'AssassinsCreedValhalla.jpeg',
    'RocketLeague.jpeg',
    'AmongUs.jpeg',
    'Valorant.jpeg',
    'HollowKnight.jpeg',
    'DeadSpaceRemake.jpeg',
    'CitiesSkylines2.jpeg',
    'DiabloIV.jpeg',
    'Starfield.jpeg',
    'SpiderMan2.jpeg',
    'AlanWake2.jpeg',
    'SeaofThieves.jpeg',
    'Hades.jpeg',
    'FallGuys.jpeg',
    'Celeste.jpeg',
]

# Paleta de colores vibrantes para diferentes géneros
colors = {
    'Cyber': (0, 255, 255),      # Cyan
    'Elden': (128, 0, 128),      # Purple
    'Horizon': (0, 255, 0),      # Green
    'Resident': (255, 0, 0),     # Red
    'FIFA': (255, 165, 0),       # Orange
    'Sims': (255, 192, 203),     # Pink
    'Stardew': (255, 215, 0),    # Gold
    'Strike': (64, 64, 64),      # Dark Gray
    'Baldur': (255, 69, 0),      # Orange Red
    'Call': (34, 139, 34),       # Dark Green
    'Minecraft': (92, 64, 51),   # Brown
    'Grand': (139, 69, 19),      # Saddle Brown
    'Witcher': (192, 192, 192),  # Silver
    'Red': (178, 34, 34),        # Firebrick
    'God': (47, 79, 79),         # Dark Slate Gray
    'Assassin': (0, 0, 139),     # Dark Blue
    'Rocket': (255, 140, 0),     # Dark Orange
    'Among': (255, 0, 127),      # Spring Pink
    'Valorant': (255, 0, 0),     # Red
    'Hollow': (169, 169, 169),   # Dark Gray
    'Dead': (128, 0, 0),         # Maroon
    'Cities': (95, 158, 160),    # Cadet Blue
    'Diablo': (139, 0, 0),       # Dark Red
    'Star': (30, 144, 255),      # Dodger Blue
    'Spider': (255, 0, 0),       # Red
    'Alan': (75, 0, 130),        # Indigo
    'Sea': (0, 105, 148),        # Ocean Blue
    'Hades': (220, 20, 60),      # Crimson
    'Fall': (255, 255, 0),       # Yellow
    'Celeste': (255, 20, 147),   # Deep Pink
}

def get_color_for_image(filename):
    """Obtener color basado en el nombre de la imagen."""
    for key, color in colors.items():
        if key.lower() in filename.lower():
            return color
    return (100, 100, 100)  # Color por defecto

def create_placeholder(filename, width=400, height=500):
    """Crear una imagen placeholder."""
    color = get_color_for_image(filename)
    
    # Crear imagen con color de fondo
    img = Image.new('RGB', (width, height), color=color)
    draw = ImageDraw.Draw(img)
    
    # Añadir rectángulo de borde
    border_color = tuple(max(0, c - 50) for c in color)
    draw.rectangle([10, 10, width-10, height-10], outline=border_color, width=3)
    
    # Preparar texto
    game_name = filename.replace('.jpeg', '').replace('.jpg', '')
    # Convertir CamelCase a palabras
    import re
    game_name = re.sub(r'([A-Z])', r' \1', game_name).strip()
    
    # Intentar usar fuente, si no disponible usar default
    try:
        font = ImageFont.truetype("arial.ttf", 24)
        small_font = ImageFont.truetype("arial.ttf", 14)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Escribir nombre del juego centrado
    text_color = (255, 255, 255)
    # Calcular posición para centrar
    bbox = draw.textbbox((0, 0), game_name, font=font)
    text_width = bbox[2] - bbox[0]
    text_x = (width - text_width) // 2
    text_y = (height - 100) // 2
    
    draw.text((text_x, text_y), game_name, fill=text_color, font=font)
    
    # Escribir "Game Image" en pequeño en la parte inferior
    small_text = "Game Image"
    bbox = draw.textbbox((0, 0), small_text, font=small_font)
    small_width = bbox[2] - bbox[0]
    small_x = (width - small_width) // 2
    
    draw.text((small_x, height - 50), small_text, fill=text_color, font=small_font)
    
    return img

# Generar todas las imágenes
print("Generando imágenes placeholder...")
for filename in images_needed:
    filepath = os.path.join(img_dir, filename)
    if not os.path.exists(filepath):
        img = create_placeholder(filename)
        img.save(filepath, quality=90)
        print(f"✓ Creada: {filename}")
    else:
        print(f"✓ Ya existe: {filename}")

print(f"\n✓ Proceso completado. {len(images_needed)} imágenes listas en {img_dir}/")
