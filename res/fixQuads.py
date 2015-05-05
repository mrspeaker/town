import glob
import bpy

# Fix Kenny's 3D objects (http://kenney.itch.io/kenney-donation) for Three.js
# Three.js' object loader barfs when object is not simple quads.

# This script uses Blender command-line to load each asset, converts to tris,
# then to quads, and re-saves (overwrites!)

# To run:
# > cd <path to assets>
# > blender -b -P fixQuads.py

for obj in glob.glob('*.obj'):
  bpy.ops.import_scene.obj(filepath=obj)
  model = bpy.data.objects[len(bpy.data.objects) - 1]

  bpy.context.scene.objects.active = model

  bpy.ops.object.mode_set(mode='EDIT')
  bpy.ops.mesh.quads_convert_to_tris()
  bpy.ops.mesh.tris_convert_to_quads()

  bpy.ops.export_scene.obj(filepath=obj, use_selection=True)
