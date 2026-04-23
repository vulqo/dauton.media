#!/bin/bash
# copy-assets.sh
# Copia los assets necesarios para el setup de Claude Design.
# Ejecutar desde esta carpeta: bash copy-assets.sh

set -e

# Paths origen
LOGO_SRC="/Users/luisfiguera/Downloads/Vulqo LLC/Clients/Dauton Store/Logo"
MANUAL_SRC="/Users/luisfiguera/Downloads/Vulqo LLC/Clients/Dauton Store"
BRIEF_SRC="/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media"

# Path destino (este mismo folder)
DEST="$(cd "$(dirname "$0")" && pwd)/assets-to-upload"
mkdir -p "$DEST"

echo "Copiando assets a: $DEST"
echo ""

# 1. Logo master color (imagotipo vertical, amarillo + negro)
if [ -f "$LOGO_SRC/imagotipo-positivo-color.png" ]; then
    cp "$LOGO_SRC/imagotipo-positivo-color.png" "$DEST/01-logo-master-color.png"
    echo "✓ 01-logo-master-color.png"
else
    echo "✗ No encontrado: $LOGO_SRC/imagotipo-positivo-color.png"
fi

# 2. Logo master black (solo negro)
if [ -f "$LOGO_SRC/imagotipo-positivo.png" ]; then
    cp "$LOGO_SRC/imagotipo-positivo.png" "$DEST/02-logo-master-black.png"
    echo "✓ 02-logo-master-black.png"
else
    echo "✗ No encontrado: $LOGO_SRC/imagotipo-positivo.png"
fi

# 3. Logo horizontal color
if [ -f "$LOGO_SRC/imagotipo-horizontal-color.png" ]; then
    cp "$LOGO_SRC/imagotipo-horizontal-color.png" "$DEST/03-logo-horizontal-color.png"
    echo "✓ 03-logo-horizontal-color.png"
else
    echo "✗ No encontrado: $LOGO_SRC/imagotipo-horizontal-color.png"
fi

# 4. Logo negativo color
if [ -f "$LOGO_SRC/imagotipo-negativo-color.png" ]; then
    cp "$LOGO_SRC/imagotipo-negativo-color.png" "$DEST/04-logo-negativo-color.png"
    echo "✓ 04-logo-negativo-color.png"
else
    echo "✗ No encontrado: $LOGO_SRC/imagotipo-negativo-color.png"
fi

# 5. Monograma favicon
if [ -f "$LOGO_SRC/favicon-color.png" ]; then
    cp "$LOGO_SRC/favicon-color.png" "$DEST/05-monograma-favicon.png"
    echo "✓ 05-monograma-favicon.png"
else
    echo "✗ No encontrado: $LOGO_SRC/favicon-color.png"
fi

# 6. Manual de identidad — buscar el PDF con nombre flexible
MANUAL_PDF=$(find "$MANUAL_SRC" -maxdepth 2 -name "Manual*Identidad*.pdf" 2>/dev/null | head -1)
if [ -n "$MANUAL_PDF" ] && [ -f "$MANUAL_PDF" ]; then
    cp "$MANUAL_PDF" "$DEST/06-manual-identidad-dauton-store.pdf"
    echo "✓ 06-manual-identidad-dauton-store.pdf (desde: $MANUAL_PDF)"
else
    echo "⚠ Manual de Identidad no encontrado automáticamente."
    echo "   Cópialo manualmente a: $DEST/06-manual-identidad-dauton-store.pdf"
fi

# 7. Design brief — buscar en el folder del proyecto
BRIEF_PDF=$(find "$BRIEF_SRC" -maxdepth 3 -name "dauton*brief*.pdf" 2>/dev/null | head -1)
if [ -n "$BRIEF_PDF" ] && [ -f "$BRIEF_PDF" ]; then
    cp "$BRIEF_PDF" "$DEST/07-design-brief.pdf"
    echo "✓ 07-design-brief.pdf (desde: $BRIEF_PDF)"
else
    # Alternativa: buscar en Downloads
    BRIEF_PDF=$(find "$HOME/Downloads" -maxdepth 3 -name "dauton*brief*.pdf" 2>/dev/null | head -1)
    if [ -n "$BRIEF_PDF" ] && [ -f "$BRIEF_PDF" ]; then
        cp "$BRIEF_PDF" "$DEST/07-design-brief.pdf"
        echo "✓ 07-design-brief.pdf (desde: $BRIEF_PDF)"
    else
        echo "⚠ Design brief PDF no encontrado automáticamente."
        echo "   Cópialo manualmente a: $DEST/07-design-brief.pdf"
    fi
fi

echo ""
echo "Assets listos en: $DEST"
echo ""
echo "Contenido final:"
ls -la "$DEST"
