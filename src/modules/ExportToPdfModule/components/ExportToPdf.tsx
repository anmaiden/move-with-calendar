import React from 'react';
import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import calendarStore from '../../CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';
import { PictureAsPdfRounded } from '@mui/icons-material';
import { formatDate } from '../../../utils/helper';

interface ExportToPDFButtonProps {
  className?: string;
}

const ExportToPDF: React.FC<ExportToPDFButtonProps> = observer(
  ({ className }) => {
    const handleExport = () => {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text('Your workout MoveWith statistics', 105, 20, {
        align: 'center',
      });
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, {
        align: 'center',
      });

      const tableData = calendarStore.savedData.savedData.map((note, index) => [
        index + 1,
        formatDate(note.date),
        note.weekNumber,
        note.dayNumber,
      ]);

      autoTable(doc, {
        startY: 40,
        head: [['#', 'Workout Date', 'Week', 'Day']],
        body: tableData,
        styles: {
          cellPadding: 5,
          fontSize: 10,
          valign: 'middle',
        },
        headStyles: {
          fillColor: '#5c715e',
          textColor: '#FFFFFF',
          fontStyle: 'bold',
        },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' },
        },
        didDrawPage: (data) => {
          // Колонтитулы
          doc.setFontSize(10);
          const pageCount = doc.getNumberOfPages();
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 10
          );
        },
      });

      const totalWorkouts = tableData.length;
      doc.setFontSize(12);
      doc.text(`Total workouts: ${totalWorkouts}`, 14, 10);

      doc.save('workout_moveWith.pdf');
    };

    return (
      <Button
        variant="contained"
        onClick={handleExport}
        startIcon={<PictureAsPdfRounded />}
        className={className}
        disabled={calendarStore.savedData.savedData.length === 0}
      >
        Export all my workouts to PDF
      </Button>
    );
  }
);

export default ExportToPDF;
