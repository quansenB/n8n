import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeTypeDescription,
	INodeExecutionData,
	INodeType,
} from 'n8n-workflow';

import {
	xentralRequest
} from './GenericFunctions';


export class Xentral implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Xentral',
		name: 'xentral',
		icon: 'file:xentral.png',
		group: ['transform'],
		version: 1,
		description: 'Xentral CRM Node',
		defaults: {
			name: 'Xentral',
			color: '#42b8c5',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'xentral',
				required: true,
			}
		],
		properties: [
			// ----------------------------------
			//         resources
			// ----------------------------------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Order',
						value: 'order',
					}
				],
				default: 'order',
				description: 'The resource to operate on.',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'order',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create an order',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an order',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get data of an order',
					},
					{
						name: 'Archive',
						value: 'archive',
						description: 'Archive an order',
					}
				],
				default: 'create',
				description: 'The operation to perform.',
			},

			// ----------------------------------
			//         order:create
			// ----------------------------------
			{
				displayName: 'Data',
				name: 'data',
				type: 'string',
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'order',
						],
					},
				},
				default: '',
				required: true,
				description: 'Data of the order to create.',
			},

			// ----------------------------------
			//         order:update
			// ----------------------------------
			/* {
				displayName: 'Order ID',
				name: 'orderId',
				type: 'number',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'order',
						],
					},
				},
				default: 0,
				required: true,
				description: 'ID of the order to update.',
			},
			{
				displayName: 'Receipt Number',
				name: 'receiptNumber',
				type: 'number',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'order',
						],
					},
				},
				default: 0,
				required: false,
				description: 'Receipt number of the order to update.',
			}, */
			{
				displayName: 'Data',
				name: 'data',
				type: 'string',
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'order',
						],
					},
				},
				default: '',
				required: false,
				description: 'Data of the order to create.',
			},


			// ----------------------------------
			//         order:get
			// ----------------------------------
			/* {
				displayName: 'Order ID',
				name: 'orderId',
				type: 'number',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'order',
						],
					},
				},
				default: 0,
				required: false,
				description: 'ID of the order to get.',
			},
			{
				displayName: 'Receipt Number',
				name: 'receiptNumber',
				type: 'number',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'order',
						],
					},
				},
				default: 0,
				required: false,
				description: 'Receipt number of the order to get.',
			}, */
			{
				displayName: 'Data',
				name: 'data',
				type: 'string',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'order',
						],
					},
				},
				default: '',
				required: false,
				description: 'Data of the order to create.',
			},

			// ----------------------------------
			//         order:archive
			// ----------------------------------
			/* {
				displayName: 'Order ID',
				name: 'orderId',
				type: 'number',
				displayOptions: {
					show: {
						operation: [
							'archive',
						],
						resource: [
							'order',
						],
					},
				},
				default: 0,
				required: true,
				description: 'ID of the order to archive.',
			}, */
			{
				displayName: 'Data',
				name: 'data',
				type: 'string',
				displayOptions: {
					show: {
						operation: [
							'archive',
						],
						resource: [
							'order',
						],
					},
				},
				default: '',
				required: false,
				description: 'Data of the order to create.',
			},
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		let resource: string;
		let operation: string;

		// For Post
		let body: IDataObject;

		let requestMethod: string;
		let endpoint: string;

		for (let i = 0; i < items.length; i++) {
		
			body = {} as IDataObject;

			resource = this.getNodeParameter('resource', 0) as string;
			operation = this.getNodeParameter('operation', 0) as string;

			if (resource === 'order') {
				if (operation === 'create') {
					// ----------------------------------
					//         create
					// ----------------------------------
					requestMethod = 'POST';
					endpoint = '/api/AuftragCreate';
					
					body = {
						data: JSON.parse(this.getNodeParameter('data', i) as string) as object,
					} as IDataObject;
					
				} else if (operation === 'update') {
					// ----------------------------------
					//         update
					// ----------------------------------
					requestMethod = 'POST';
					endpoint = '/api/AuftragEdit';

					body = {
						data: JSON.parse(this.getNodeParameter('data', i) as string) as object,
					} as IDataObject;

					/* const orderId = this.getNodeParameter('orderId', i) as string;
					const receiptNumber = this.getNodeParameter('receiptNumber', i) as string;

					if (orderId === "0" && receiptNumber === "0") {
						throw new Error('Either order ID or receipt number must be selected');
					} else if (orderId !== "0") {
						body.id = orderId;
					} else {
						body.belegnr = receiptNumber; 
					} */
				} else if (operation === 'get') {
					// ----------------------------------
					//         get
					// ----------------------------------
					requestMethod = 'POST';
					endpoint = '/api/AuftragGet';

					body = {
						data: JSON.parse(this.getNodeParameter('data', i) as string) as object,
					} as IDataObject;

				} else if (operation === 'archive') {
					// ----------------------------------
					//         archive
					// ----------------------------------
					requestMethod = 'POST';
					endpoint = '/api/AuftragArchivieren';

					body = {
						data: JSON.parse(this.getNodeParameter('data', i) as string) as object,
					} as IDataObject;

				} else {
					throw new Error(`The operation '${operation}' is not known!`);
				}

			} else {
				throw new Error(`The resource '${resource}' is not known!`);
			}

			const responseData = await xentralRequest.call(this, requestMethod, endpoint, body);

			returnData.push(responseData as IDataObject);

		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
