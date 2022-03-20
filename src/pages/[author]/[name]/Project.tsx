import { NextPage } from 'next'
import { BarGraphNode, RootNode } from 'src/components'
import { useRouter } from 'next/router'

import styles from 'src/styles/Project.module.scss'
import { usePublicProjectQuery } from 'src/graphql/hooks'
import { useMemo } from 'react'
import { PomelloNode, ProcessedNode } from 'src/types/data/base'

const Project: NextPage = () => {
  const router = useRouter()
  const { author, name } = router.query
  const { loading, error, data } = usePublicProjectQuery(
    author?.toString() ?? '',
    name?.toString() ?? ''
  )

  const processedNodes = useMemo(() => {
    if (!error && !loading)
      return data.publicProject.nodes.map(
        (node: PomelloNode) =>
          ({
            ...node,
            data: {
              legend: 'count',
              data: { test1: 500, test2: 500, ...JSON.parse(node.data) },
            },
          } as ProcessedNode)
      )
  }, [error, loading, data?.publicProject.nodes])

  if (loading || !processedNodes) return <div>LOADING</div>
  if (error) return <div>{error.message}</div>

  const { description, name: title } = data.publicProject
  return (
    <>
      <div className={styles.container}>
        <RootNode title={title} description={description} />
      </div>
      <div className={styles.container}>
        {processedNodes.map((node: ProcessedNode) => (
          <BarGraphNode key={node.id} nodeData={node.data} id={node.id} />
        ))}
      </div>
    </>
  )
}

export default Project
