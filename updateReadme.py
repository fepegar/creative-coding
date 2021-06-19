import os
from os.path import dirname, realpath, isdir, join

thisDir = dirname(realpath(__file__))
fns = os.listdir(thisDir)

with open('hide.txt') as f:
    ignore = f.readlines()

ignore = [s.rstrip('\n') for s in ignore]

sketches = []
for folder in fns:
    fp = join(thisDir, folder)
    if not isdir(fp) or folder in ignore or folder.startswith('.'):
        continue
    sketches.append(folder)

with open('README.md', 'w') as f:
    f.write('# List of sketches\n')
    for folder in sorted(sketches, key=str.casefold):
        f.write('* [%s](https://fepegar.github.io/creative-coding/%s)\n' % (folder, folder))
