import React from "react"
import { Root, Viewport, Pages, Page, CanvasLayer } from "@fileforge/pdfreader"

const MyPDFReader = ({ fileURL }) => (
  <Root fileURL={fileURL}>
    <Viewport>
      <Pages>
        <Page>
          <CanvasLayer />
        </Page>
      </Pages>
    </Viewport>
  </Root>
)

export default MyPDFReader
