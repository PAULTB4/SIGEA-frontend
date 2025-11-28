import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Badge,
  Typography,
  Spinner,
  Avatar,
  Skeleton,
  Divider
} from '../desingSystem/primitives';
import { colors, spacing } from '../desingSystem/tokens';

const DesignSystemTest = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTestLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ 
      padding: spacing.spacing[8], 
      backgroundColor: colors.neutral[50],
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="h1" style={{ marginBottom: spacing.spacing[2] }}>
          Design System Test
        </Typography>
        <Typography variant="body" color={colors.text.secondary} style={{ marginBottom: spacing.spacing[8] }}>
          Prueba todos los componentes del sistema de diseño
        </Typography>

        <Divider spacing="large" />

        {/* Buttons Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Buttons
          </Typography>
          <div style={{ display: 'flex', gap: spacing.spacing[3], flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={handleTestLoading}>
              Primary Button
            </Button>
            <Button variant="secondary">
              Secondary Button
            </Button>
            <Button variant="outline">
              Outline Button
            </Button>
            <Button variant="ghost">
              Ghost Button
            </Button>
            <Button variant="danger">
              Danger Button
            </Button>
            <Button variant="primary" loading={loading}>
              Loading State
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>

          <Typography variant="h4" style={{ marginTop: spacing.spacing[6], marginBottom: spacing.spacing[4] }}>
            Button Sizes
          </Typography>
          <div style={{ display: 'flex', gap: spacing.spacing[3], alignItems: 'center' }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </Card>

        {/* Inputs Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Input Fields
          </Typography>
          <div style={{ display: 'grid', gap: spacing.spacing[4], maxWidth: '500px' }}>
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="Ingresa tu correo electrónico"
              fullWidth
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              fullWidth
            />
            <Input
              label="Con Error"
              error="Este campo es requerido"
              fullWidth
            />
            <Input
              label="Con Éxito"
              success="Email válido"
              value="usuario@ejemplo.com"
              fullWidth
            />
            <Input
              label="Deshabilitado"
              disabled
              value="Campo deshabilitado"
              fullWidth
            />
          </div>
        </Card>

        {/* Badges Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Badges
          </Typography>
          <div style={{ display: 'flex', gap: spacing.spacing[3], flexWrap: 'wrap' }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>

          <Typography variant="h4" style={{ marginTop: spacing.spacing[6], marginBottom: spacing.spacing[4] }}>
            Badge Sizes
          </Typography>
          <div style={{ display: 'flex', gap: spacing.spacing[3], alignItems: 'center' }}>
            <Badge size="small" variant="primary">Small</Badge>
            <Badge size="medium" variant="primary">Medium</Badge>
            <Badge size="large" variant="primary">Large</Badge>
          </div>

          <Typography variant="h4" style={{ marginTop: spacing.spacing[6], marginBottom: spacing.spacing[4] }}>
            Rounded Badges
          </Typography>
          <div style={{ display: 'flex', gap: spacing.spacing[3] }}>
            <Badge variant="primary" rounded>Rounded</Badge>
            <Badge variant="secondary" rounded>Rounded</Badge>
            <Badge variant="success" rounded>Rounded</Badge>
          </div>
        </Card>

        {/* Cards Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Cards
          </Typography>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: spacing.spacing[4] }}>
            <Card variant="elevated" padding="medium" hoverable>
              <Card.Header>
                <Typography variant="h5">Elevated Card</Typography>
              </Card.Header>
              <Card.Body>
                <Typography variant="body">
                  Esta es una tarjeta con elevación y efecto hover
                </Typography>
              </Card.Body>
            </Card>

            <Card variant="outlined" padding="medium">
              <Card.Header>
                <Typography variant="h5">Outlined Card</Typography>
              </Card.Header>
              <Card.Body>
                <Typography variant="body">
                  Esta es una tarjeta con borde
                </Typography>
              </Card.Body>
            </Card>

            <Card variant="filled" padding="medium">
              <Card.Header>
                <Typography variant="h5">Filled Card</Typography>
              </Card.Header>
              <Card.Body>
                <Typography variant="body">
                  Esta es una tarjeta con fondo relleno
                </Typography>
              </Card.Body>
            </Card>
          </div>
        </Card>

        {/* Typography Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Typography
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.spacing[3] }}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Divider spacing="medium" />
            <Typography variant="bodyLarge">Body Large - Lorem ipsum dolor sit amet</Typography>
            <Typography variant="body">Body - Lorem ipsum dolor sit amet consectetur</Typography>
            <Typography variant="bodySmall">Body Small - Lorem ipsum dolor sit amet</Typography>
            <Typography variant="caption">Caption - Texto pequeño auxiliar</Typography>
            <Typography variant="overline">Overline Text</Typography>
          </div>
        </Card>

        {/* Loading States Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Loading States
          </Typography>
          
          <Typography variant="h4" style={{ marginBottom: spacing.spacing[3] }}>
            Spinners
          </Typography>
          <div style={{ display: 'flex', gap: spacing.spacing[6], alignItems: 'center', marginBottom: spacing.spacing[6] }}>
            <Spinner size="small" />
            <Spinner size="medium" />
            <Spinner size="large" />
            <Spinner size="medium" color={colors.brand.secondary} />
          </div>

          <Typography variant="h4" style={{ marginBottom: spacing.spacing[3] }}>
            Skeletons
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.spacing[3] }}>
            <Skeleton width="100%" height="3rem" variant="rounded" />
            <Skeleton width="80%" height="1.5rem" />
            <Skeleton width="60%" height="1.5rem" />
            <div style={{ display: 'flex', gap: spacing.spacing[3], alignItems: 'center' }}>
              <Skeleton width="50px" height="50px" variant="circular" />
              <div style={{ flex: 1 }}>
                <Skeleton width="100%" height="1rem" />
                <Skeleton width="70%" height="0.875rem" style={{ marginTop: spacing.spacing[2] }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Avatars Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Avatars
          </Typography>
          <div style={{ display: 'flex', gap: spacing.spacing[4], alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar name="Juan Pérez" size="small" />
            <Avatar name="María López" size="medium" />
            <Avatar name="Carlos García" size="large" />
            <Avatar name="Ana Martínez" size="xlarge" />
            <Avatar 
              name="Roberto Chen" 
              fallbackColor={colors.brand.secondary} 
              size="large"
            />
            <Avatar 
              name="Laura Sánchez" 
              variant="square" 
              fallbackColor={colors.semantic.info}
              size="large"
            />
          </div>
        </Card>

        {/* Dividers Section */}
        <Card padding="large" style={{ marginBottom: spacing.spacing[6] }}>
          <Typography variant="h3" style={{ marginBottom: spacing.spacing[4] }}>
            Dividers
          </Typography>
          <div>
            <Typography variant="body">Contenido antes del divider</Typography>
            <Divider spacing="small" />
            <Typography variant="body">Contenido después del divider (small spacing)</Typography>
            <Divider spacing="medium" />
            <Typography variant="body">Contenido después del divider (medium spacing)</Typography>
            <Divider spacing="large" />
            <Typography variant="body">Contenido después del divider (large spacing)</Typography>
          </div>
        </Card>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: spacing.spacing[8] }}>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
          >
            ← Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemTest;