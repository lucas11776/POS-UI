import { Role as RoleInterface } from '../../shared/models/role.model';

export const Roles = (roles: string[]): RoleInterface[] => {
    return roles.map((role, index) => Role(role, index));
}

export const Role = (name: string, id: number = 1): RoleInterface => {
    return { id: id, name: name }
} 