import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function DailyWeatherCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14, paddingBottom: '25px' }} color="text.secondary" gutterBottom>
          Daily Weather
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="rectangular" width={810} height={20} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="rectangular" width={810} height={20} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="rectangular" width={810} height={20} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="rectangular" width={810} height={20} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="rectangular" width={810} height={20} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant="rectangular" width={810} height={20} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default DailyWeatherCardSkeleton;
