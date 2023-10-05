import anon from './public/anon.jpg'
import React from "react";

export const dummyUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


// Routes

export const rootRoute:string = '/'
export const authRoute: string = '/auth'
export const profileRoute = '/profile'
export const friendsRoute: string = '/friends'
export const usersRoute: string = '/Users'
export const infoRoute: string = '/info'

// Common Funcs


export const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()
export {}