export type Modules = Record<string, boolean>;

export interface ModuleProps {
  moduleName: string;
  visibilityHandler: (module: string) => void;
}

export type ModuleOptions = 'module2' | 'module3' | 'module4' | 'module5';
