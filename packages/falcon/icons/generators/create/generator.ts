import { formatFiles, Tree } from '@nx/devkit'
import { get } from 'lodash'
import { addToFunction, addToUnionType, writeChanges } from '@spacedock/warp'
import { IconGeneratorSchema } from './schema'
import { createIconSetFromSvg } from './utils/createIconSetFromSvg'
import { parseEachFigmaIconSet } from './utils/parseEachFigmaIconSet'
import { paste } from 'copy-paste'

export async function iconGenerator(tree: Tree, options: IconGeneratorSchema) {
  const iconSet = await parseEachFigmaIconSet(
    await createIconSetFromSvg(options.content || paste()),
  )

  const iconSetAsJSON = JSON.stringify(
    get(iconSet.export(), 'icons.home'),
    null,
    4,
  )
  writeChanges(
    tree,
    '@falcon/icons',
    'molecules/icon/addIcons.ts',
    ({ sourceFile }) => {
      return [
        ...addToFunction(
          sourceFile,
          'addIcons',
          `addIcon('falcon-ui:${options.name}', ${iconSetAsJSON})`,
        ),
      ]
    },
  )
  writeChanges(
    tree,
    '@falcon/icons',
    'molecules/icon/Icon.tsx',
    ({ sourceFile }) => {
      return [
        ...addToUnionType(sourceFile, 'ApprovedIcon', `'${options.name}'`),
      ]
    },
  )
  await formatFiles(tree)
}

export default iconGenerator
