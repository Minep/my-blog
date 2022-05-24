import { PublicEndpointModifier } from "@/auth/constants";
import { RefreshTokenGuard } from "@/auth/guards/refresh.guard";
import { SetMetadata, UseGuards } from "@nestjs/common";

export const Protected = () => SetMetadata(PublicEndpointModifier, false)
export const Public = () => SetMetadata(PublicEndpointModifier, true)
export const RefreshEndpoint = () => UseGuards(RefreshTokenGuard)