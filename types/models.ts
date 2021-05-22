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

export interface Product extends BaseModel {
	name: string;
	thumbnail: string;
	price: number;
	markingPrice: number;
	brand: string;
	provider: string;
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
	createdIp: string;
	paidAt: Date;
	// Snapshot fields
	products: Array<Pick<Product, '_id' | 'name' | 'thumbnail' | 'price' | 'markingPrice'>>;
}
