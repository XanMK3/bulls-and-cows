import React from 'react';
import cn from 'classnames';
import './style';

const Ball = ({
  index,
  kind,
  active,
  isDragging,
  isOver,
  preview,
  onChange,
}) => {
  const interactive = typeof onChange === 'function';
  const Element = interactive ? 'button' : 'span';
  const label = `Position ${index + 1}, color ${kind + 1}`;

  return (
    <Element
      type={interactive ? 'button' : undefined}
      aria-label={preview ? undefined : `${label}${interactive ? '. Activate to change color' : ''}`}
      aria-hidden={preview || undefined}
      role={!interactive && !preview ? 'img' : undefined}
      className={cn(
        'ball',
        `ball-${kind}`,
        typeof kind === 'number' && `ball--color-${kind}`,
        {
          active,
          preview,
          dradding: isDragging,
          over: isOver,
        },
      )}
      style={{
        '--ball-color': typeof kind === 'number' ? `var(--ball-${kind})` : undefined,
      }}
      onClick={interactive ? () => onChange(index) : undefined}
    />
  );
};

export default Ball;
