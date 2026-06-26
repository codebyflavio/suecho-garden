import React, { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GardenScene = lazy(() => import('./components/GardenScene'))

const LOADING_FLOWERS = ['✿', '❀', '✾']

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-spring-yellow">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="text-center"
    >
      <p
        className="text-2xl text-rose-400 font-serif"
        style={{ letterSpacing: '0.15em' }}
      >
        花园正在盛开
      </p>
      <motion.div
        className="mt-5 flex justify-center gap-3"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {LOADING_FLOWERS.map((flower, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            {flower}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  </div>
)

const App: React.FC = () => (
  <AnimatePresence mode="wait">
    <Suspense fallback={<LoadingScreen />}>
      <GardenScene />
    </Suspense>
  </AnimatePresence>
)

export default App
