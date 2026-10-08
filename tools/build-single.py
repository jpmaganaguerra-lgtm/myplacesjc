#!/usr/bin/env python3
"""Junta CSS y JS en un solo HTML (dist/myplace-sjc.single.html) para previsualizar sin carpetas."""
import re,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
h=open(f'{root}/index.html',encoding='utf-8').read()
def css(m): return '<style>\n'+open(f'{root}/{m.group(1)}',encoding='utf-8').read()+'</style>'
def js(m): return '<script>\n'+open(f'{root}/{m.group(1)}',encoding='utf-8').read()+'\n</script>'
h=re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">',css,h)
h=re.sub(r'<script src="(js/[^"]+)"></script>',js,h)
h=h.replace('assets/','../assets/')  # dist/ vive un nivel abajo
os.makedirs(f'{root}/dist',exist_ok=True)
open(f'{root}/dist/myplace-sjc.single.html','w',encoding='utf-8').write(h)
print('dist/myplace-sjc.single.html')
