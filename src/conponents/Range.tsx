import React from 'react'
import ReactSlider from 'react-slider'


function Range() {
  return (
    <div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[0, 1]}  // 범위를 0에서 10까지로 변경
        ariaLabelledby={['first-slider-label', 'second-slider-label']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        max={10}
        minDistance={1}
        step={1}
      />
</div>
  )
}

export default Range