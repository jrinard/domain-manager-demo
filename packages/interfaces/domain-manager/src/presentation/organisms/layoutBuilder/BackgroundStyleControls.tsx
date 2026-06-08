interface BackgroundStyleControlsProps {
  backgroundSize: string
  setBackgroundSize: (value: string) => void
  backgroundPosition: string
  setBackgroundPosition: (value: string) => void
  backgroundRepeat: string
  setBackgroundRepeat: (value: string) => void
  deviceLabel?: string
}

export const BackgroundStyleControls = ({
  backgroundSize,
  setBackgroundSize,
  backgroundPosition,
  setBackgroundPosition,
  backgroundRepeat,
  setBackgroundRepeat,
  deviceLabel,
}: BackgroundStyleControlsProps) => {
  return (
    <div className="bg-grayscale-800 space-y-4 border-t border-black p-4">
      <div className="text-sm font-semibold text-white">
        {deviceLabel || 'Background Image Style Configurations'}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Background Size */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400">Size</label>
          <select
            value={backgroundSize}
            onChange={(e) => setBackgroundSize(e.target.value)}
            className="border-grayscale-600 bg-grayscale-900 rounded border px-2 py-1 text-sm text-white"
          >
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="auto">Auto</option>
            <option value="100%">100%</option>
          </select>
        </div>

        {/* Background Position */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400">Position</label>
          <select
            value={backgroundPosition}
            onChange={(e) => setBackgroundPosition(e.target.value)}
            className="border-grayscale-600 bg-grayscale-900 rounded border px-2 py-1 text-sm text-white"
          >
            <option value="center">Center</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="top center">Top Center</option>
            <option value="center center">Center Center</option>
          </select>
        </div>

        {/* Background Repeat */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400">Repeat</label>
          <select
            value={backgroundRepeat}
            onChange={(e) => setBackgroundRepeat(e.target.value)}
            className="border-grayscale-600 bg-grayscale-900 rounded border px-2 py-1 text-sm text-white"
          >
            <option value="no-repeat">No Repeat</option>
            <option value="repeat">Repeat</option>
            <option value="repeat-x">Repeat X</option>
            <option value="repeat-y">Repeat Y</option>
          </select>
        </div>
      </div>
    </div>
  )
}
