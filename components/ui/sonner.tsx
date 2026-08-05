"use client"

import {Toaster as Sonner, type ToasterProps } from "sonner";

export default function Toaster({...props}:ToasterProps) {
    return (
        <Sonner position="top-center" richColors {...props} />
    );
}