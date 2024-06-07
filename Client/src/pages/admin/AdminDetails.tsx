import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { useAuth } from '../../context/auth';

export default function AdminBioCard() {
    const[auth, setAuth] = useAuth()
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 'lg',
      }}
    >
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar src="/static/images/avatar/2.jpg" sx={{ '--Avatar-size': '4rem' }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: '3px solid',
            borderColor: 'background.surface',
          }}
        >
          ADMIN
        </Chip>
        <Typography level="title-lg">Admin: {auth?.user?.name}</Typography>
        <Typography level="title-lg">Phone: {auth?.user?.phone}</Typography>
        <Typography level="title-lg">e-mail: {auth?.user?.email}</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
            '& > button': { borderRadius: '2rem' },
          }}
        >
        </Box>
      </CardContent>
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button>Message</Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}