import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exampleWrapper: {
      position: 'relative',
      marginTop: theme.spacing(3),
      height: 180,
    },
    speedDial: {
      position: 'fixed',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
    fabActions: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.background.paper,
      }
    }
  }),
);

type actions = {
  icon: JSX.Element;
  name: string;
  tooltip: string;
  onClick: (n: number) => Promise<void>;
}

interface Props {
  actions: actions[];
}

const SpeedDials: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { actions } = props;
  const [direction] = React.useState<SpeedDialProps['direction']>('up');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOnClick = (a: actions) => a.onClick(10);

  return (
    <div className={classes.exampleWrapper}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={direction}
      >
        {actions.map((a) => (
          <SpeedDialAction
            key={a.name}
            icon={a.icon}
            tooltipTitle={a.tooltip}
            className={classes.fabActions}
            onClick={(event) => handleOnClick(a)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default SpeedDials;
