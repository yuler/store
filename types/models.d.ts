/**
 * Base model property
 */
interface BaseModel {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
	isDeleted: boolean;
	deletedAt: undefined | Date;
}

export interface User extends BaseModel {
	nickname: string;
	gender: number;
	city: string;
}

export interface Porduct extends BaseModel {
	name: string;
	title: string;
	brand: string;
	provider: string;
	price: number;
	markingPrice: number;
	thumbnail: string;
	description: string;
	carousels: string[];

	createdAt: Date;
	updatedAt: Date;
	deleted: boolean;
}

export interface Category extends BaseModel {
	name: string;
}

export interface Label extends BaseModel {
	name: string;
}

export enum OrderStatus {
	UNPAID,
	PAID,
	FINISHED,
	CANCELED,
	REFUNDED
}

export interface Order extends BaseModel {
	number: string;
	price: number;
	status: OrderStatus;
	createIp: string;
	paidAt: Date;
	// Relation
	products: Array<{
		_id: string;
		amount: number;
	}>;
}
