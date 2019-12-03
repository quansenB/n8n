import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeTypeDescription,
	INodeExecutionData,
	INodeType,
} from 'n8n-workflow';


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
				type: 'json',
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
			{
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
			},
			{
				displayName: 'Data',
				name: 'data',
				type: 'json',
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
				required: false,
				description: 'Data of the order to create.',
			},


			// ----------------------------------
			//         order:get
			// ----------------------------------
			{
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
			},

			// ----------------------------------
			//         order:archive
			// ----------------------------------
			{
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
			},
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		let item: INodeExecutionData;
		let myString: string;

		// Itterates over all input items and add the key 'myString' with the
		// value the parameter 'myString' resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			myString = this.getNodeParameter('myString', itemIndex, '') as string;
			item = items[itemIndex];

			item.json['myString'] = myString;
		}

		return this.prepareOutputData(items);

	}
}
