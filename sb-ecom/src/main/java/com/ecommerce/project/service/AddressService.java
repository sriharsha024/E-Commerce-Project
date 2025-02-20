package com.ecommerce.project.service;

import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface AddressService {
    List<AddressDTO> getAllAddresses();
    AddressDTO getAddressById(Long addressId);
    List<AddressDTO> getUserAddresses(User user);
    AddressDTO createAddress(AddressDTO addressDTO, User user);
    AddressDTO updateAddressById(Long addressId, @Valid AddressDTO addressDTO);
    AddressDTO deleteAddressById(Long addressId);
}
