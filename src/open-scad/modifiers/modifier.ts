import { inlineLastLines } from '../../misc/lines/functions/after-last-line.ts';
import { ILines } from '../../misc/lines/lines.type.ts';

export type IModifier =
  | 'none'
  | 'background' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Background_modifier
  | 'debug' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Debug_modifier
  | 'root' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Root_modifier
  | 'disable' // https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Modifier_Characters#Disable_modifier
  ;

export type IOpenScadModifier =
  | '' // none
  | '%' // background
  | '#' // debug
  | '!' // root
  | '*' // disable
  ;

export function toOpenSCADModifier(
  modifier: IModifier,
): IOpenScadModifier {
  switch (modifier) {
    case 'none':
      return '';
    case 'background':
      return '%';
    case 'debug':
      return '#';
    case 'root':
      return '!';
    case 'disable':
      return '*';
    default:
      throw new TypeError(`Invalid modifier`);
  }
}

export function modifier(
  modifier: IModifier,
  lines: ILines,
): ILines {
  return inlineLastLines(
    [toOpenSCADModifier(modifier)],
    lines,
  );
}

export function none(
  lines: ILines,
): ILines {
  return modifier('none', lines);
}

export function background(
  lines: ILines,
): ILines {
  return modifier('background', lines);
}

export function debug(
  lines: ILines,
): ILines {
  return modifier('debug', lines);
}


export function root(
  lines: ILines,
): ILines {
  return modifier('root', lines);
}

export function disable(
  lines: ILines,
): ILines {
  return modifier('disable', lines);
}
