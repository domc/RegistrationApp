RegisterApp.factory('Register', ['$resource', ($resource: ng.resource.IResourceService): ng.resource.IResourceClass<ng.resource.IResource<any>> =>  {
    return $resource('/api/Register/');
}]);