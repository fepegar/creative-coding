"""
Emojis are downloaded from https://www.emojione.com/download

The emoji module is installed with pip
"""

import json
import shutil
from pathlib import Path

import emoji


def get_emoji_from_unicode_list(unicodes):
    return ''.join(chr(int(code, 16)) for code in unicodes)


def get_country_from_emoji(emoji_):
    try:
        alias = emoji.UNICODE_EMOJI_ALIAS[emoji_]
    except KeyError:
        return None
    if 'flag_for' not in alias:
        return None
    country = emoji.demojize(emoji_).strip(':')
    return country


def beautify_country(country):
    country = country.replace('_', ' ')
    country = country.replace('&', 'and')
    country = country.replace('’', "'")
    return country


def main():
    SIZE = 128

    input_dir = Path(f'/tmp/EmojiOne_3.1.1_{SIZE}x{SIZE}_png')
    output_dir = input_dir.parent / 'assets'
    emojis_dir = output_dir / 'emoji-flags'
    output_list_path = output_dir / 'countries.json'
    if output_dir.is_dir():
        shutil.rmtree(output_dir)
    output_dir.mkdir()
    emojis_dir.mkdir()

    names = {}
    for png_path in input_dir.glob('*.png'):
        unicodes = png_path.stem.split('-')
        decoded = get_emoji_from_unicode_list(unicodes)
        country = get_country_from_emoji(decoded)
        if country is None: continue
        filename = f'{country}.png'
        dst = emojis_dir / filename
        shutil.copyfile(png_path, dst)
        names[beautify_country(country)] = filename

    with open(output_list_path, 'w') as outfile:
        json.dump(names, outfile, indent=2)


if __name__ == '__main__':
    main()
