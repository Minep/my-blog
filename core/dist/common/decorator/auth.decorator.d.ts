import { PublicEndpointModifier } from "@/auth/constants";
export declare const Protected: () => import("@nestjs/common").CustomDecorator<typeof PublicEndpointModifier>;
export declare const Public: () => import("@nestjs/common").CustomDecorator<typeof PublicEndpointModifier>;
export declare const RefreshEndpoint: () => MethodDecorator & ClassDecorator;
