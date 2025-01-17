import React, { useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ErrorVisualizer = ({ errorDetails, workDays, currentDay }) => {
  const totalDays = workDays.length;

  const errorDays = useMemo(() => Object.keys(errorDetails).map((key) => parseInt(key)), [errorDetails]);

  const cumulativeErrors = useMemo(() => {
    const errors = new Array(totalDays).fill(0);
    for (let i = 0; i < totalDays; i++) {
      errors[i] = errorDays.includes(i) ? (errors[i - 1] || 0) + 1 : errors[i - 1] || 0;
    }
    return errors;
  }, [errorDays, totalDays]);

  const getColor = (index, errorCount) => {
    if (index > currentDay) return "hsl(0, 0%, 75%)";
    if (errorCount === 0) return "hsl(120, 70%, 50%)";
    if (errorCount === 1) return "hsl(59, 100%, 67.10%)";
    return "hsl(0, 70%, 50%)";
  };

  const tooltipRef = useRef(null);

  const handleMouseEnter = (e, dayIndex, errorCount) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.visibility = "visible";
      tooltipRef.current.style.opacity = "1";
      const rect = e.target.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
      // Calcular la posición horizontal
      let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      if (left + tooltipRect.width > viewportWidth) {
        left = viewportWidth - tooltipRect.width - 10; // 10px de margen
      }
      if (left < 0) {
        left = 10; // 10px de margen
      }
    
      // Calcular la posición vertical
      let top = rect.top - tooltipRect.height - 10;
      if (top < 0) {
        top = rect.bottom + 10; // Mostrar debajo si no hay espacio arriba
      }

      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.top = `${top}px`;

      if (dayIndex > currentDay) {
        tooltipRef.current.innerText = `Día ${dayIndex + 1}: No Disponible`;
      } else if (errorDetails[dayIndex]) {
        const { failures, time } = errorDetails[dayIndex];
        tooltipRef.current.innerText = `Día ${dayIndex + 1}: \nErrores: ${failures}, \nTiempo: ${time}s`;
      } else {
        tooltipRef.current.innerText = `Día ${dayIndex + 1}: Sin errores`;
      }
    }
  };

  const handleMouseLeave = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.visibility = "hidden";
      tooltipRef.current.style.opacity = "0";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Errores del mes</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "6px",
            padding: "10px",
            borderRadius: "12px",
            background: "hsl(0, 0%, 95%)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {cumulativeErrors.map((errorCount, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{
                minWidth: "20px",
                maxWidth: "20px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: getColor(index, errorCount),
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "20px",
                  fontSize: "8px",
                  color: "white",
                  fontWeight: "bold",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => handleMouseEnter(e, index, errorCount)}
                onMouseLeave={handleMouseLeave}
              ></div>
              <span className="mt-1 text-xs font-bold text-gray-600">{workDays[index]}</span>
            </div>
          ))}
        </div>

        <div
          ref={tooltipRef}
          style={{
            position: "fixed", 
            visibility: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "12px",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: 1000, 
            maxWidth: "200px", 
            wordWrap: "break-word", 
          }}
        >
          Errores acumulados
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorVisualizer;