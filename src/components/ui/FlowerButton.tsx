import React, { memo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    'font-serif rounded-full border cursor-pointer select-none',
    'transition-colors duration-200',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-rose-100/55 border-rose-300/50 text-rose-700 hover:bg-rose-200/65 hover:border-rose-400/65',
        ghost:
          'bg-transparent border-rose-300/30 text-rose-600 hover:bg-rose-100/35',
      },
      size: {
        md: 'px-7 py-3 text-base',
        lg: 'px-10 py-4 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'lg' },
  }
)

interface FlowerButtonProps extends VariantProps<typeof buttonVariants> {
  label?: string
  onClick?: () => void
}

const FlowerButton: React.FC<FlowerButtonProps> = memo(
  ({ label = '进入花园深处', onClick, variant, size }) => {
    const [bloomed, setBloomed] = useState(false)

    const handleClick = useCallback(() => {
      if (bloomed) return
      setBloomed(true)
      onClick?.()
      setTimeout(() => setBloomed(false), 900)
    }, [bloomed, onClick])

    return (
      <motion.button
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 75, delay: 2.8 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleClick}
        className={buttonVariants({ variant, size })}
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 22px rgba(255,170,180,0.28)',
          letterSpacing: '0.12em',
        }}
      >
        <motion.span
          className="text-xl"
          animate={bloomed ? { rotate: [0, 20, -12, 6, 0], scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 0.55 }}
        >
          ✿
        </motion.span>

        <span>{label}</span>

        <AnimatePresence>
          {bloomed && (
            <motion.span
              key="bloom-ring"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-rose-300 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.button>
    )
  }
)

FlowerButton.displayName = 'FlowerButton'

export default FlowerButton
