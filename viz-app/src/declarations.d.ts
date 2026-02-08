/// <reference types="vite/client" />

declare module "*.json" {
    const value: any;
    export default value;
}

declare module 'lucide-react/dist/esm/icons/*' {
    import { LucideIcon } from 'lucide-react';
    const icon: LucideIcon;
    export default icon;
}
