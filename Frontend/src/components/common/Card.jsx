import { Badge, Button } from './';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  onClick,
  hoverable = false,
  isVerified,
  onVerify,
  showVerifyButton,
  verifying,
  ...props
}) => {
  const cardClasses = [
    'card',
    hoverable ? 'card-hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      <div className="card-header">
        <div className="card-title-section">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </div>
        <div className="card-actions">
          {showVerifyButton && (
            <Button
              variant="secondary"
              size="small"
              onClick={onVerify}
              disabled={verifying || isVerified}
            >
              {verifying ? 'Verifying...' : isVerified ? 'Verified' : 'Verify on Blockchain'}
            </Button>
          )}
          {isVerified !== undefined && (
            <Badge 
              variant={isVerified ? 'success' : 'warning'}
              className="verification-badge"
            >
              {isVerified ? 'Verified on Blockchain' : 'Pending Verification'}
            </Badge>
          )}
        </div>
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;