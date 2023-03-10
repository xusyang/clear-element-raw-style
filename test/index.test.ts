import { describe, expect, it } from 'vitest'

import { clear, clearElementRawClass, clearElementTopClass, isContainElementClass } from '../src'

describe('should', () => {
  it('isContainElementClass', () => {
    expect(isContainElementClass('.el-icon')).toBe(true)
    expect(isContainElementClass('.d-el-icon')).toBe(false)
  })

  it('clearElementRawClass', () => {
    const res = clearElementRawClass(`
    .el-icon {
      position: absolute;
    }

    .el-message-box__status.d-el-icon {
      position: absolute;
    }

    .el-switch__label .d-el-icon {
      position: absolute;
    }

    .el-icon .is-loading {
      position: absolute;
    }

    .d-el-icon .el-icon .d-el-icon{
      position: absolute;
    }

    .d-el-icon .el1-icon{
      position: absolute;
    }

    .d-el-icon .el-message-box__status.d-el-icon {
      position: absolute;
    }

    .d-el-icon .el-switch__label .d-el-icon {
      position: absolute;
    }

    .d-el-icon .el-icon .is-loading {
      position: absolute;
    }
  `)

    expect(res).toMatchInlineSnapshot(`
      ".d-el-icon .el1-icon {
        position: absolute;
      }
      "
    `)
  })

  it('clearElementTopClass', () => {
    const res = clearElementTopClass(`
      .d-el-icon {
        position: absolute;
      }

      .d-el-message-box__status.d-el-icon {
        position: absolute;
      }

      .d-el-switch__label .d-el-icon {
        position: absolute;
      }

      .d-el-icon .is-loading {
        position: absolute;
      }
    `)

    expect(res).toMatchInlineSnapshot(`
      ".d-el-icon {
        position: absolute;
      }

      .d-el-message-box__status.d-el-icon {
        position: absolute;
      }

      .d-el-switch__label .d-el-icon {
        position: absolute;
      }

      .d-el-icon .is-loading {
        position: absolute;
      }
      "
    `)
  })
})

describe('clear', () => {
  it('clear dir', () => {
    const dir = clear('./../../css/css001')
    expect(dir).toMatchInlineSnapshot('false')
  })
})
