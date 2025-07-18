'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { InventoryActions } from './inventory-actions';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'product.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.product?.name || 'N/D';
    },
  },
  {
    accessorKey: 'product.category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      switch (row.original.product?.category) {
        case 'perecivel':
          return 'Perecível';
        case 'nao_perecivel':
          return 'Não perecível';
        case 'congelado':
          return 'Congelado';
        default:
          return 'N/D';
      }
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Quantidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { quantity } = row.original;
      const { unit } = row.original.product || {};
      if (!unit) return `${quantity}`;
      // Add "s" only if quantidade is not 1 and unidade doesn't already end with "s"
      const suffix =
        quantity !== 1 && !unit.endsWith('s') && unit !== 'kg' && unit !== 'L'
          ? 's'
          : '';
      return `${quantity} ${unit}${suffix}`;
    },
  },
  {
    accessorKey: 'expirationDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Validade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.expirationDate);
      return format(date, 'dd/MM/yy');
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return <InventoryActions inventory={row.original} />;
    },
  },
];
