"use client";
import React from 'react'
import { AppSidebar } from "../components/app-sidebar"
import ErrorVisualizer from "../components/error-visualizer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  // Detalles de errores
  const errorDetails = {
    5: { failures: 2, time: 120 },
    7: { failures: 3, time: 180 },
    9: { failures: 1, time: 60 },
    10: { failures: 2, time: 90 },
  };

  // Lista de días laborales
  const workDays = ["M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M", "J", "V", "L", "M", "M"];

  // Día actual (ajusta según sea necesario)
  const currentDay = 15; // Por ejemplo, el día 15

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Análisis Meses</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold text-center">Análisis de Errores del Mes</h1>
          <ErrorVisualizer 
            errorDetails={errorDetails} 
            workDays={workDays} 
            currentDay={currentDay} 
          />
          <ErrorVisualizer 
            errorDetails={errorDetails} 
            workDays={workDays} 
            currentDay={8} 
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}