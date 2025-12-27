/*
   ARCHIVO DE DATOS - curriculumData
   Contiene toda la información de la malla curricular (10 semestres)
   Puedes modificar aquí las materias, créditos y prerrequisitos
*/

 const curriculumData = [
            {
                semester: "Primer Semestre",
                courses: [
                    { 
                        id: "QMC100",
                        code: "QMC-100", 
                        name: "QUIMICA GENERAL", 
                        credits: 4,
                        prerequisites: []
                    },
                    { 
                        id: "FIS100",
                        code: "FIS-100", 
                        name: "FISICA BASICA I", 
                        credits: 4,
                        prerequisites: []
                    },
                    { 
                        id: "MEC101",
                        code: "MEC-101", 
                        name: "DIBUJO TECNICO I", 
                        credits: 3,
                        prerequisites: []
                    },
                    { 
                        id: "MAT101",
                        code: "MAT-101", 
                        name: "CALCULO I", 
                        credits: 5,
                        prerequisites: []
                    },
                    { 
                        id: "MAT100",
                        code: "MAT-100", 
                        name: "ALGEBRA I", 
                        credits: 4,
                        prerequisites: []
                    }
                ]
            },
            {
                semester: "Segundo Semestre",
                courses: [
                    { 
                        id: "QMC200",
                        code: "QMC-200", 
                        name: "QUIMICA ORGANICA", 
                        credits: 4,
                        prerequisites: ["QUIMICA GENERAL"]
                    },
                    { 
                        id: "FIS102",
                        code: "FIS-102", 
                        name: "FISICA BASICA II", 
                        credits: 4,
                        prerequisites: ["CALCULO I", "FISICA BASICA I"]
                    },
                    { 
                        id: "MAT204",
                        code: "MAT-204", 
                        name: "INFORMATICA I", 
                        credits: 3,
                        prerequisites: ["DIBUJO TECNICO I"]
                    },
                    { 
                        id: "MAT102",
                        code: "MAT-102", 
                        name: "CALCULO II", 
                        credits: 5,
                        prerequisites: ["CALCULO I"]
                    },
                    { 
                        id: "MAT103A",
                        code: "MAT-103", 
                        name: "ALGEBRA II", 
                        credits: 4,
                        prerequisites: ["ALGEBRA I"]
                    },
                    { 
                        id: "MAT103B",
                        code: "MAT-103", 
                        name: "ECONOMIA GENERAL", 
                        credits: 3,
                        prerequisites: ["ALGEBRA I"]
                    }
                ]
            },
            {
                semester: "Tercer Semestre",
                courses: [
                    { 
                        id: "QMC206",
                        code: "QMC-206", 
                        name: "FISICOQUIMICA", 
                        credits: 4,
                        prerequisites: ["QUIMICA ORGANICA", "FISICA BASICA II"]
                    },
                    { 
                        id: "FIS200",
                        code: "FIS-200", 
                        name: "FISICA BASICA III", 
                        credits: 4,
                        prerequisites: ["FISICA BASICA II", "CALCULO II"]
                    },
                    { 
                        id: "MEC203",
                        code: "MEC-203", 
                        name: "CIENCIAS DE LOS MATERIALES", 
                        credits: 3,
                        prerequisites: ["INFORMATICA I"]
                    },
                    { 
                        id: "MAT207",
                        code: "MAT-207", 
                        name: "ECUACIONES DIFERENCIALES", 
                        credits: 5,
                        prerequisites: ["CALCULO II"]
                    },
                    { 
                        id: "IND110",
                        code: "IND-110", 
                        name: "PROBABILIDAD Y ESTADISTICA", 
                        credits: 4,
                        prerequisites: ["ALGEBRA II"]
                    },
                    { 
                        id: "IND130",
                        code: "IND-130", 
                        name: "CONTABILIDAD INDUSTRIAL", 
                        credits: 3,
                        prerequisites: ["ECONOMIA GENERAL"]
                    }
                ]
            },
            {
                semester: "Cuarto Semestre",
                courses: [
                    { 
                        id: "MEC244",
                        code: "MEC-244", 
                        name: "TERMODINAMICA TECNICA", 
                        credits: 4,
                        prerequisites: ["FISICOQUIMICA"]
                    },
                    { 
                        id: "MEC200",
                        code: "MEC-200", 
                        name: "RESISTENCIA DE LOS MATERIALES", 
                        credits: 4,
                        prerequisites: ["FISICA BASICA III", "CIENCIAS DE LOS MATERIALES"]
                    },
                    { 
                        id: "IND206",
                        code: "IND-206", 
                        name: "NORMAS LEGALES", 
                        credits: 3,
                        prerequisites: ["ECUACIONES DIFERENCIALES"]
                    },
                    { 
                        id: "IND120",
                        code: "IND-120", 
                        name: "ESTADISTICA MATEMATICA", 
                        credits: 4,
                        prerequisites: ["PROBABILIDAD Y ESTADISTICA"]
                    },
                    { 
                        id: "IND140",
                        code: "IND-140", 
                        name: "MECADOTECNIA INDUSTRIAL", 
                        credits: 3,
                        prerequisites: ["CONTABILIDAD INDUSTRIAL"]
                    }
                ]
            },
            {
                semester: "Quinto Semestre",
                courses: [
                    { 
                        id: "MEC265",
                        code: "MEC-265", 
                        name: "MAQUINAS TERMICAS", 
                        credits: 4,
                        prerequisites: ["TERMODINAMICA TECNICA"]
                    },
                    { 
                        id: "MEC242",
                        code: "MEC-242", 
                        name: "TECNOLOGIA MECANICA", 
                        credits: 4,
                        prerequisites: ["RESISTENCIA DE LOS MATERIALES"]
                    },
                    { 
                        id: "ELC277",
                        code: "ELC-277", 
                        name: "ELECTROTECNIA INDUSTRIAL I", 
                        credits: 4,
                        prerequisites: ["CIENCIAS DE LOS MATERIALES"]
                    },
                    { 
                        id: "IND207",
                        code: "IND-207", 
                        name: "METODOLOGIA DE LA INVESTIGACION", 
                        credits: 3,
                        prerequisites: ["NORMAS LEGALES", "ESTADISTICA MATEMATICA"]
                    },
                    { 
                        id: "IND150",
                        code: "IND-150", 
                        name: "INVESTIGACION OPERATIVA I", 
                        credits: 4,
                        prerequisites: ["ESTADISTICA MATEMATICA"]
                    },
                    { 
                        id: "IND201",
                        code: "IND-201", 
                        name: "ADMINISTRACION INDUSTRIAL", 
                        credits: 3,
                        prerequisites: ["MECADOTECNIA INDUSTRIAL"]
                    }
                ]
            },
            {
                semester: "Sexto Semestre",
                courses: [
                    { 
                        id: "IND175",
                        code: "IND-175", 
                        name: "OPERACIONES UNITARIAS I", 
                        credits: 4,
                        prerequisites: ["MAQUINAS TERMICAS"]
                    },
                    { 
                        id: "MEC255",
                        code: "MEC-255", 
                        name: "ELEMENTOS DE MAQUINAS", 
                        credits: 4,
                        prerequisites: ["TECNOLOGIA MECANICA", "ELECTROTECNIA INDUSTRIAL I"]
                    },
                    { 
                        id: "IND300",
                        code: "IND-300", 
                        name: "ELECTIVA I", 
                        credits: 3,
                        prerequisites: ["ELECTROTECNIA INDUSTRIAL I", "NORMAS LEGALES"]
                    },
                    { 
                        id: "IND208",
                        code: "IND-208", 
                        name: "GESTION DE TALENTO", 
                        credits: 3,
                        prerequisites: ["METODOLOGIA DE LA INVESTIGACION"]
                    },
                    { 
                        id: "IND155",
                        code: "IND-155", 
                        name: "INVESTIGACION OPERATIVA II", 
                        credits: 4,
                        prerequisites: ["INVESTIGACION OPERATIVA I"]
                    },
                    { 
                        id: "IND223",
                        code: "IND-223", 
                        name: "INGENIERIA DE METODOS", 
                        credits: 3,
                        prerequisites: ["ADMINISTRACION INDUSTRIAL", "METODOLOGIA DE LA INVESTIGACION"]
                    }
                ]
            },
            {
                semester: "Séptimo Semestre",
                courses: [
                    { 
                        id: "IND176",
                        code: "IND-176", 
                        name: "OPERACIONES UNITARIAS II", 
                        credits: 4,
                        prerequisites: ["OPERACIONES UNITARIAS I"]
                    },
                    { 
                        id: "IND241",
                        code: "IND-241", 
                        name: "CONTROL AUTOMATICO", 
                        credits: 4,
                        prerequisites: ["ELEMENTOS DE MAQUINAS"]
                    },
                    { 
                        id: "IND204",
                        code: "IND-204", 
                        name: "HIGIENE Y SEGURIDAD INDUSTRIAL", 
                        credits: 3,
                        prerequisites: ["ELECTIVA I", "ELEMENTOS DE MAQUINAS"]
                    },
                    { 
                        id: "IND270",
                        code: "IND-270", 
                        name: "FINANZAS PARA LA INGENIERIA", 
                        credits: 3,
                        prerequisites: ["GESTION DE TALENTO"]
                    },
                    { 
                        id: "IND210",
                        code: "IND-210", 
                        name: "PLANIFICACION CONTROL DE PRODUCCION I", 
                        credits: 4,
                        prerequisites: ["INVESTIGACION OPERATIVA II"]
                    },
                    { 
                        id: "IND236",
                        code: "IND-236", 
                        name: "COSTOS INDUSTRIALES I", 
                        credits: 3,
                        prerequisites: ["INGENIERIA DE METODOS"]
                    }
                ]
            },
            {
                semester: "Octavo Semestre",
                courses: [
                    { 
                        id: "IND225",
                        code: "IND-225", 
                        name: "PROCESOS INDUSTRIALES", 
                        credits: 4,
                        prerequisites: ["OPERACIONES UNITARIAS II"]
                    },
                    { 
                        id: "IND285",
                        code: "IND-285", 
                        name: "MEDIO AMBIENTE EN LA INDUSTRIA", 
                        credits: 4,
                        prerequisites: ["CONTROL AUTOMATICO"]
                    },
                    { 
                        id: "IND286",
                        code: "IND-286", 
                        name: "MANTENIMIENTO E INSTALACIONES INDUSTRIALES", 
                        credits: 3,
                        prerequisites: ["HIGIENE Y SEGURIDAD INDUSTRIAL"]
                    },
                    { 
                        id: "IND216",
                        code: "IND-216", 
                        name: "PREPARACION Y EVALUACION DE PROYECTO", 
                        credits: 3,
                        prerequisites: ["FINANZAS PARA LA INGENIERIA"]
                    },
                    { 
                        id: "IND211",
                        code: "IND-211", 
                        name: "PLANIFICACION CONTROL DE PRODUCCION II", 
                        credits: 4,
                        prerequisites: ["PLANIFICACION CONTROL DE PRODUCCION I"]
                    },
                    { 
                        id: "IND237",
                        code: "IND-237", 
                        name: "COSTOS INDUSTRIALES II", 
                        credits: 3,
                        prerequisites: ["COSTOS INDUSTRIALES I"]
                    }
                ]
            },
            {
                semester: "Noveno Semestre",
                courses: [
                    { 
                        id: "IND245",
                        code: "IND-245", 
                        name: "CONTROL DE CALIDAD", 
                        credits: 4,
                        prerequisites: ["PROCESOS INDUSTRIALES"]
                    },
                    { 
                        id: "IND250",
                        code: "IND-250", 
                        name: "PRACTICAS INDUSTRIALES", 
                        credits: 10,
                        prerequisites: ["PROCESOS INDUSTRIALES", "MEDIO AMBIENTE EN LA INDUSTRIA", "MANTENIMIENTO E INSTALACIONES INDUSTRIALES", "PREPARACION Y EVALUACION DE PROYECTO", "PLANIFICACION CONTROL DE PRODUCCION II", "COSTOS INDUSTRIALES II"]
                    },
                    { 
                        id: "IND242",
                        code: "IND-242", 
                        name: "TECNOLOGIAS AVANZADAS", 
                        credits: 4,
                        prerequisites: ["MANTENIMIENTO E INSTALACIONES INDUSTRIALES"]
                    },
                    { 
                        id: "IND226",
                        code: "IND-226", 
                        name: "EMPRENDEDURISMO INNOVACION", 
                        credits: 3,
                        prerequisites: ["PREPARACION Y EVALUACION DE PROYECTO"]
                    },
                    { 
                        id: "IND212",
                        code: "IND-212", 
                        name: "LOGISTICA", 
                        credits: 4,
                        prerequisites: ["PLANIFICACION CONTROL DE PRODUCCION II"]
                    },
                    { 
                        id: "IND238",
                        code: "IND-238", 
                        name: "PLANEACION ESTRATEGICA", 
                        credits: 3,
                        prerequisites: ["COSTOS INDUSTRIALES II", "PLANIFICACION CONTROL DE PRODUCCION II"]
                    }
                ]
            },
            {
                semester: "Décimo Semestre",
                courses: [
                    { 
                        id: "GRL001",
                        code: "GRL-001", 
                        name: "MODALIDAD DE GRADUACION", 
                        credits: 10,
                        prerequisites: ["CONTROL DE CALIDAD", "PRACTICAS INDUSTRIALES", "TECNOLOGIAS AVANZADAS", "EMPRENDEDURISMO INNOVACION", "LOGISTICA", "PLANEACION ESTRATEGICA"]
                    }
                ]
            }
        ];
