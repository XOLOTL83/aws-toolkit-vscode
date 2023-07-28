/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { ExtContext } from '../shared/extensions'
import { Commands } from '../shared/vscode/commands2'
import { telemetry } from '../shared/telemetry/telemetry'
import { Ec2Node } from './explorer/ec2ParentNode'
import {
    openRemoteConnection,
    openTerminal,
    rebootInstance,
    refreshExplorer,
    startInstance,
    stopInstance,
} from './commands'

export async function activate(ctx: ExtContext): Promise<void> {
    ctx.extensionContext.subscriptions.push(
        Commands.register('aws.ec2.openTerminal', async (node?: Ec2Node) => {
            await telemetry.ec2_connectToInstance.run(async span => {
                span.record({ ec2ConnectionType: 'ssm' })
                await openTerminal(node)
            })
        }),

        Commands.register('aws.ec2.openRemoteConnection', async (node?: Ec2Node) => {
            await openRemoteConnection(node)
        }),

        Commands.register('aws.ec2.startInstance', async (node?: Ec2Node) => {
            await startInstance(node)
            await refreshExplorer(node)
        }),

        Commands.register('aws.ec2.stopInstance', async (node?: Ec2Node) => {
            await stopInstance(node)
            await refreshExplorer(node)
        }),

        Commands.register('aws.ec2.rebootInstance', async (node?: Ec2Node) => {
            await rebootInstance(node)
            await refreshExplorer(node)
        }),

        Commands.register('aws.ec2.linkToLaunchInstance', async () => {
            console.log('you just ran the linkToLaunch command!')
        })
    )
}
