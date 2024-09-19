import GameComponent from '@/components/game/gameComponent'
import Statistics from '@/components/statistics'

export default function Play() {
  return (
    <div className="flex flex-col px-4">
      <Statistics />
      <GameComponent />
    </div>
  )
}
