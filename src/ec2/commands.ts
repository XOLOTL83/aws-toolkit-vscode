/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { startInstanceWithCancel } from './changeInstanceStatus'
import { Ec2InstanceNode } from './explorer/ec2InstanceNode'
import { Ec2Node } from './explorer/ec2ParentNode'
import { Ec2ConnectionManager } from './model'
import { Ec2Prompter } from './prompter'
import { Ec2Selection } from './utils'

export async function openTerminal(node?: Ec2Node) {
    const selection = await getSelection(node)

    const connectionManager = new Ec2ConnectionManager(selection.region)
    await connectionManager.attemptToOpenEc2Terminal(selection)
}

export async function openRemoteConnection(node?: Ec2Node) {
    const selection = await getSelection(node)
    //const connectionManager = new Ec2ConnectionManager(selection.region)
    console.log(selection)
}

export async function startInstance(node?: Ec2Node) {
    const selection = await getSelection(node)
    await startInstanceWithCancel(selection)
}

async function getSelection(node: Ec2Node | undefined): Promise<Ec2Selection> {
    const prompter = new Ec2Prompter()
    const selection = node && node instanceof Ec2InstanceNode ? node.toSelection() : await prompter.promptUser()
    return selection
}
