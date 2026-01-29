import type { CourseManifest } from '../../types/CourseTypes';

export const DEMO_COURSE: CourseManifest = {
    id: "course-demo-001",
    title: "Gestión de Proyectos: Tema 2 (SaaS Demo)",
    version: "1.0",
    modules: [
        {
            id: "mod-1",
            title: "Planificación de Proyectos",
            units: [
                {
                    id: "unit-1",
                    title: "Pre-Planificación",
                    components: [
                        {
                            id: "header-1",
                            type: "section-header",
                            props: {
                                title: "Ruta de Pre-Planificación",
                                description: "Antes de crear el cronograma, debemos definir el 'Qué' y el 'Por qué'. Este es el flujo crítico desde la idea hasta la autorización formal."
                            }
                        },
                        {
                            id: "tabbed-card-1",
                            type: "tabbed-info-card",
                            props: {
                                tip: "Tip de PMP: Este proceso culmina con el <strong>Project Charter</strong>. Sin él, no debes iniciar la planificación detallada.",
                                items: [
                                    {
                                        id: 1,
                                        title: "1. Génesis y Valoración",
                                        subtitle: "¿De dónde surge la necesidad?",
                                        iconName: "lightbulb",
                                        color: "border-yellow-500",
                                        bg: "bg-yellow-50",
                                        content: [
                                            { label: "Detonantes", text: "Obsolescencia técnica, competencia, ideas de empleados u oportunidades de ahorro." },
                                            { label: "Acción Clave", text: "Valorar si la idea se alinea con la estrategia y si es financieramente viable." }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        title: "2. Solución Conceptual",
                                        subtitle: "¿Cómo lo vamos a resolver?",
                                        iconName: "settings",
                                        color: "border-blue-500",
                                        bg: "bg-blue-50",
                                        content: [
                                            { label: "Análisis de Alternativas", text: "¿Comprar software (COTS)? ¿Desarrollo a medida? ¿Adaptar sistema actual? ¿Externalizar?" },
                                            { label: "Criterios", text: "Decidir basándose en Tiempo, Coste, Riesgo y Conocimiento del equipo." }
                                        ]
                                    },
                                    // ... Adding remaining steps for completeness if needed, or keeping it short for prototype
                                    {
                                        id: 6,
                                        title: "6. Lanzamiento",
                                        subtitle: "Project Charter",
                                        iconName: "rocket",
                                        color: "border-purple-600",
                                        bg: "bg-purple-50",
                                        content: [
                                            { label: "Oficialización", text: "Firma del Acta de Constitución (Project Charter)." },
                                            { label: "Equipo", text: "Nombrar al Project Manager (PM) y formar el equipo núcleo." }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            id: "text-footer",
                            type: "text-block",
                            props: {
                                content: "Este contenido es renderizado 100% dinámicamente desde <code>src/data/mocks/demo-course.ts</code>."
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
