import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import calendarStore from '../../CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';
import { PictureAsPdfRounded } from '@mui/icons-material';
import { formatDate } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';

interface ExportToPDFButtonProps {
  className?: string;
}

const ExportToPDF: React.FC<ExportToPDFButtonProps> = observer(
  ({ className }) => {
    const { t } = useTranslation();

    const handleExport = () => {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text('Activity History', 105, 20, {
        align: 'center',
      });
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, {
        align: 'center',
      });

      const tableData = calendarStore.savedData.savedData.map((item, index) => [
        index + 1,
        formatDate(item.date),
        item.dayNumber,
        item.calories,
        item.videoPlaylist || '-',
      ]);

      autoTable(doc, {
        startY: 40,
        head: [['#', 'Workout Date', 'Day Number', 'Calories Burned', 'Video']],
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
          4: { cellWidth: 'auto' },
        },
      });

      const totalWorkouts = tableData.length;
      doc.setFontSize(12);
      doc.text(`Total workouts: ${totalWorkouts}`, 14, 10);

      doc.save('workout_moveWith.pdf');
    };

    return (
      <Tooltip title={t('activity.export')}>
        <Button
          variant="contained"
          size={'small'}
          onClick={handleExport}
          endIcon={<PictureAsPdfRounded />}
          className={className}
          disabled={calendarStore.savedData.savedData.length === 0}
        >
          {t('activity.export')}
        </Button>
      </Tooltip>
    );
  }
);

export default ExportToPDF;
