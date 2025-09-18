export type SvgNode = [tag: string, attributes?: Record<string, string | number>, children?: SvgNode[]]
export type Content = string | number | HTMLElement | SVGElement | Node
export type Element = HTMLElement | SVGElement
export type ElementAttributes = 
  | Record<string, string | number>
  | Record<"class", string | Array<string | false | undefined> | string>
  | Record<"style", string | Record<string, string>>
export type ElementChildren = Array<ElementParams | HTMLElement | SVGElement>
export type ElementParams = [tag: string, attributes?: ElementAttributes, children?: ElementChildren]
