declare module '*.scss' {
  const styles: {[className: string]: string};
  export = styles;
}

declare module '*.sass' {
  const styles: {[className: string]: string};
  export = styles;
}

declare module 'assets/*';
