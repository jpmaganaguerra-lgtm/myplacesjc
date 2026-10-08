#!/bin/bash
# Uso: tools/encode-hero-video.sh video-original.mp4
# Genera en assets/video/hero/: hero-1080-av1.mp4, hero-1080-h264.mp4, hero-720-av1.mp4, hero-720-h264.mp4, hero-poster.jpg
# Requiere ffmpeg con libsvtav1 y libx264. AV1 tarda varios minutos. Bucle continuo (fundido de 1.2 s), sin audio, sin desenfoque.
set -e
IN="$1"; [ -z "$IN" ] && { echo "Falta el archivo de entrada"; exit 1; }
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/video/hero"; mkdir -p "$OUT"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN"); F=1.2; E=$(python3 -c "print($D-$F)")
mk(){ echo "[0:v]scale=$1:-2:flags=lanczos,format=$2,split=3[a][b][c];[a]trim=start=$F:end=$E,setpts=PTS-STARTPTS[mid];[b]trim=start=$E,setpts=PTS-STARTPTS[tail];[c]trim=end=$F,setpts=PTS-STARTPTS[head];[tail][head]xfade=transition=fade:duration=$F:offset=0[x];[mid][x]concat=n=2:v=1:a=0[v]"; }
ffmpeg -v error -y -i "$IN" -filter_complex "$(mk 1920 yuv420p10le)" -map "[v]" -an -c:v libsvtav1 -preset 7 -crf 33 -pix_fmt yuv420p10le -g 120 -svtav1-params tune=0 -movflags +faststart "$OUT/hero-1080-av1.mp4"
ffmpeg -v error -y -i "$IN" -filter_complex "$(mk 1280 yuv420p10le)" -map "[v]" -an -c:v libsvtav1 -preset 7 -crf 38 -pix_fmt yuv420p10le -g 120 -svtav1-params tune=0 -movflags +faststart "$OUT/hero-720-av1.mp4"
ffmpeg -v error -y -i "$IN" -filter_complex "$(mk 1920 yuv420p)" -map "[v]" -an -c:v libx264 -preset slow -crf 25 -maxrate 3000k -bufsize 6000k -profile:v high -level 4.1 -pix_fmt yuv420p -x264-params aq-mode=3:deblock=-1,-1 -movflags +faststart -g 60 "$OUT/hero-1080-h264.mp4"
ffmpeg -v error -y -i "$IN" -filter_complex "$(mk 1280 yuv420p)" -map "[v]" -an -c:v libx264 -preset slow -crf 25 -maxrate 1400k -bufsize 2800k -profile:v main -level 3.1 -pix_fmt yuv420p -x264-params aq-mode=3:deblock=-1,-1 -movflags +faststart -g 60 "$OUT/hero-720-h264.mp4"
ffmpeg -v error -y -i "$OUT/hero-1080-h264.mp4" -frames:v 1 -q:v 2 "$OUT/hero-poster.jpg"
echo "Listo en $OUT"
echo "Si cambia el nivel/perfil de los videos, revisa las cadenas codecs= en js/hero-video.js"
