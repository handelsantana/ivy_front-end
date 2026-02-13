'use client';

/**
 * Reports List Page (Placeholder)
 */

import { AppLink } from '@/platform';
import { useReports } from '@/cms';
import { formatDate, getStatusColor } from '@/cms/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, FileBarChart } from 'lucide-react';

export default function ReportsList() {
  const { reports } = useReports();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="ivy-h2">Reports</h1>
          <p className="text-[hsl(var(--ivy-foreground-muted))]">
            Manage downloadable reports and whitepapers
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileBarChart className="h-12 w-12 text-[hsl(var(--ivy-foreground-muted)/0.5)] mb-4" />
          <h3 className="ivy-h4 mb-2">Reports Coming Soon</h3>
          <p className="text-[hsl(var(--ivy-foreground-muted))] max-w-md">
            The reports module is under development. You'll be able to create and manage 
            downloadable PDFs, whitepapers, and research reports here.
          </p>
        </div>
      </Card>
    </div>
  );
}


