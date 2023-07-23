import { makeVar } from '@apollo/client';

import { ClientType } from '../types';

export const setClients = makeVar<ClientType[]>([]);
export const setClient = makeVar<ClientType | null>(null);
export const setIsNewClient = makeVar<boolean>(false);